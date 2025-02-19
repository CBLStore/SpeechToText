import { LightningElement, api, wire, track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class SpeechToText extends LightningElement {
    @api recordId;
    @api objectApiName;

    speechRecognition;
    isRecording = false;
    recognizedText = '';
    errorMessage = '';

    @track fields = [];
    selectedField = '';
    selectedLanguage = 'en-US'; // Default language

    // Available language options
    languageOptions = [
        { label: 'English (US)', value: 'en-US' },
        { label: 'Spanish (Spain)', value: 'es-ES' },
        { label: 'French (France)', value: 'fr-FR' },
        { label: 'German (Germany)', value: 'de-DE' },
        { label: 'Hindi (India)', value: 'hi-IN' }
    ];

    // Fetch object info to get field list
    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
wiredObjectInfo({ data, error }) {
    if (data) {
        this.fields = Object.keys(data.fields)
            .filter(fieldName => {
                const field = data.fields[fieldName];
                return (
                    field.updateable &&
                    ['String', 'TextArea', 'LongTextArea', 'RichText'].includes(field.dataType) &&
                    !field.compound // Exclude Address fields (which are compound fields)
                );
            })
            .map(fieldName => ({
                label: data.fields[fieldName].label,
                value: fieldName
            }));
    } else if (error) {
        this.fields = [];
        this.showToast('Error', 'Failed to fetch fields.', 'error');
    }
}

    connectedCallback() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.speechRecognition = new SpeechRecognition();
            this.speechRecognition.continuous = false;
            this.speechRecognition.lang = this.selectedLanguage;
            this.speechRecognition.interimResults = false;

            this.speechRecognition.onresult = (event) => {
                this.recognizedText = Array.from(event.results)
                    .map(result => result[0].transcript)
                    .join('');
            };

            this.speechRecognition.onerror = (event) => {
                this.errorMessage = `Error: ${event.error}`;
                this.showToast('Error', `Speech Recognition Error: ${event.error}`, 'error');
            };
        } else {
            this.errorMessage = 'Speech recognition is not supported in this browser.';
            this.showToast('Error', this.errorMessage, 'error');
        }
    }

    get isNotRecording() {
        return !this.isRecording;
    }

    get isSaveDisabled() {
        return !this.recognizedText || !this.selectedField || !this.recordId;
    }

    handleStart() {
        if (this.speechRecognition) {
            this.isRecording = true;
            this.speechRecognition.lang = this.selectedLanguage; // Set language before starting
            this.speechRecognition.start();
           
        }
    }

    handleStop() {
        if (this.speechRecognition) {
            this.isRecording = false;
            this.speechRecognition.stop();
          
        }
    }

    handleClear() {
        this.recognizedText = '';
        this.errorMessage = '';
        
    }

    handleFieldChange(event) {
        this.selectedField = event.target.value;
    }

    handleLanguageChange(event) {
        this.selectedLanguage = event.target.value;
    }

    async handleSave() {
        if (!this.recordId || !this.selectedField || !this.recognizedText) {
            this.showToast('Warning', 'Please select a field and ensure there is text to save.', 'warning');
            return;
        }

        const fields = {
            Id: this.recordId,
            [this.selectedField]: this.recognizedText
        };

        try {
            await updateRecord({ fields });
            this.showToast('Success', 'Speech text saved successfully!', 'success');
        } catch (error) {
            this.showToast('Error', 'Failed to save speech text.', 'error');
        }
    }

    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
    }
}