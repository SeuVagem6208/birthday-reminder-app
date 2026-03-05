// notification system to alert users about upcoming birthdays

const warningDays = [30, 7, 1, 0]; // Days before the birthday to send notifications

function checkBirthdays(birthdays) {
    const currentDate = new Date('2026-03-05'); // Current date for checking
    birthdays.forEach(birthday => {
        const birthdayDate = new Date(birthday.date);
        const timeDiff = birthdayDate.getTime() - currentDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (warningDays.includes(daysDiff)) {
            alert(`Reminder: ${birthday.name}'s birthday is in ${daysDiff} day(s)!`);
        }
    });
}

// Example usage:
const birthdays = [
    { name: 'Alice', date: '2026-04-04' },
    { name: 'Bob', date: '2026-03-06' },
];

checkBirthdays(birthdays);