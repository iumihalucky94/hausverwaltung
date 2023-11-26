// formUtils.js
export function updateMissingKeys(jsonData, inputFormsList, propertyName) {
    const existingKeys = Object.keys(jsonData);
    const allKeys = inputFormsList[propertyName].map(field => field.inputName);

    // Check for missing keys and add them to the JSON object with empty values
    const missingKeys = allKeys.filter(key => !existingKeys.includes(key));
    missingKeys.forEach(missingKey => {
        jsonData[missingKey] = '';
    });
}

export function checkRequiredFields(jsonData, inputFormsList, propertyName) {
    if (!jsonData) {
        console.error('jsonData is undefined');
        return;
    }

    const emptyRequiredFields = [];

    inputFormsList[propertyName].forEach(field => {
        const key = field.inputName;
        const isRequired = field.isRequired;

        if (isRequired && (!(key in jsonData) || jsonData[key].trim() === '')) {
            emptyRequiredFields.push(key);
        }
    });

    let response = `Fields ${emptyRequiredFields.join(', ')} are required but have empty values.`

    if (emptyRequiredFields.length > 0) {
        return response;
    } else {
        return true;
    }
}
