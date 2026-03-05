// birthday management functions

// Function to parse a birthday in a given timezone
function parseBirthday(birthdayString, timezone) {
    // Create a date object in the specified timezone
    return new Date(birthdayString + 'T00:00:00' + timezone);
}

// Function to format a birthday for display
function formatBirthday(birthday, timezone) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: timezone };
    return birthday.toLocaleDateString('en-US', options);
}

// Function to handle birthday reminders based on user's timezone
function handleBirthdayReminders(birthdays, timezone) {
    birthdays.forEach(birthday => {
        const parsedDate = parseBirthday(birthday.date, timezone);
        const formattedDate = formatBirthday(parsedDate, timezone);
        console.log(`Reminder: ${birthday.name} has a birthday on ${formattedDate}`);
    });
}

// Example usage:
const birthdays = [
    { name: 'Alice', date: '2026-03-15' },
    { name: 'Bob', date: '2026-04-22' }
];
const userTimezone = 'America/New_York';
handleBirthdayReminders(birthdays, userTimezone);
