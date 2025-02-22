# Speech-to-Text Lightning Web Component

## Overview

The **Speech-to-Text Lightning Web Component** is a Salesforce application designed to enable users to convert spoken words into text, simplifying data entry tasks. The component provides seamless integration with Salesforce records, allowing users to select fields, dictate text, and save it directly into the Salesforce. It is optimized to work across both desktop browsers and the Salesforce mobile app, ensuring a consistent experience on any device.

## Key Features

- **Real-Time Speech Recognition:** Converts spoken words into text in real-time using browser-based speech recognition APIs.
- **Multi-Language Support:** Supports multiple languages, including English, Spanish, French, German, and Hindi.
- **Field Selection:** Allows users to select specific fields of a Salesforce record for data entry.
- **Dynamic Status Updates:** Displays the current status (Recording or Not Recording) with clear indicators.
- **Error Handling:** Provides toast notifications for errors such as unsupported browsers or recognition failures.
- **Integration with Salesforce Records:** Updates selected fields in Salesforce records with recognized text.
- **Mobile Compatibility:** Fully functional on the Salesforce mobile app for Field Service Lightning and other use cases.

## Installation

To use this Lightning Web Component in your Salesforce environment, follow these steps:
- Clone or download the repository to your local machine.
- Deploy the component to your Salesforce org using Salesforce CLI or other deployment tools.
- Add the component to a Lightning page, app, or the Salesforce mobile app.

## Usage Scenario

The Speech-to-Text Lightning Web Component is ideal for scenarios where users need to efficiently convert spoken words into text for documentation, record updates, or note-taking. This component significantly improves productivity for both desktop and mobile users within Salesforce.

<img src="https://github.com/user-attachments/assets/3f2103b6-c0ee-4a68-b20c-41307835f1bc" height="700" width="500">

- **Field Selection:** Select the desired field from the dropdown list.
- **Language Selection:** Choose the language for speech recognition from the available options.
- **Start Recording:** Click the "Start" button to begin speech recognition.
- **Stop Recording:** Click the "Stop" button to end the session. The recognized text will appear in the text area.
- **Save Data:** Once satisfied, click "Save" to update the selected field of the record.
- **Clear Text:** Use the "Clear" button to reset the text area and start over.
