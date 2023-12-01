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

export function updateValuesFromB(jsonA, jsonB) {
    console.log(jsonA, jsonB)
    // Check if jsonA and jsonB are equal
    // if (JSON.stringify(jsonA) === JSON.stringify(jsonB)) {
    if (JSON.stringify(jsonA) === JSON.stringify(jsonB)) {
        return 1; // Return "1" if they are equal
    }

    // Check if jsonB is empty
    console.log(Object.keys(jsonB).length)
    if (Object.keys(jsonB).length === 0) {
        return 2; // Return "2" if jsonB is empty
    }

    // Iterate over the keys in A
    for (let key in jsonA) {
        // Check if the key exists in B
        if (jsonB.hasOwnProperty(key)) {
            // Update the value in A with the value from B
            jsonA[key] = jsonB[key];
        }
    }

    // Return the updated JSON A
    return jsonA;
}