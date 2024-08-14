document.addEventListener('DOMContentLoaded', () => {
    // Get today's date
    const today = new Date();

    // Cache the calculated values
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayNameFull = daysOfWeek[today.getDay()];
    const yearFull = today.getFullYear();
    const dateNumeric = today.getDate();
    
    // Map of data types to content generators
    const contentGenerators = {
        'day': (format, lang) => {
            let dayName = dayNameFull;
            if (lang) {
                dayName = today.toLocaleString(lang, { weekday: 'long' });
            }
            switch (format) {
                case 'short':
                    return dayName.slice(0, 3);  // "Mon"
                case 'narrow':
                    return dayName.slice(0, 2);  // "Mo"
                default:
                    return dayName;  // Full day name
            }
        },
        'year': (format) => {
            return format === '2-digit' ? String(yearFull).slice(2) : yearFull;
        },
        'month': (format, lang) => {
            return today.toLocaleString(lang || 'default', { month: format || 'long' });
        },
        'date': (format) => {
            return format === '2-digit' ? String(dateNumeric).padStart(2, '0') : dateNumeric;
        }
    };

    // Select all elements with vd-data-date attribute
    const elements = document.querySelectorAll('[vd-data-date]');

    // Iterate over each element and apply the appropriate content
    elements.forEach(element => {
        const dataType = element.getAttribute('vd-data-date');
        const format = element.getAttribute('vd-data-format');
        const lang = element.getAttribute('vd-data-lang');
        const generateContent = contentGenerators[dataType];

        if (generateContent) {
            const content = generateContent(format, lang);
            requestAnimationFrame(() => {
                element.textContent = content;
                console.log(`Updated element with vd-data-date="${dataType}", vd-data-format="${format}", and vd-data-lang="${lang}" to content: ${content}`);
            });
        } else {
            console.log(`Unknown vd-data-date type: ${dataType}`);
        }
    });
});
