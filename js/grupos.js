// groups management module
const GroupsManager = (function() {
    let groups = [];

    // Function to update groups bar
    function updateGroupsBar() {
        const groupsBar = document.getElementById('groups-bar');
        groupsBar.innerHTML = ''; // Clear existing groups
        groups.forEach(group => {
            const groupElement = document.createElement('div');
            groupElement.className = 'group-item';
            groupElement.textContent = group.name;
            groupsBar.appendChild(groupElement);
        });
    }

    // Function to populate select dropdown
    function populateSelectDropdown(selectElementId) {
        const selectElement = document.getElementById(selectElementId);
        selectElement.innerHTML = ''; // Clear existing options
        groups.forEach(group => {
            const option = document.createElement('option');
            option.value = group.id;
            option.textContent = group.name;
            selectElement.appendChild(option);
        });
    }

    // Public API
    return {
        updateGroupsBar,
        populateSelectDropdown,
        setGroups: function(newGroups) {
            groups = newGroups;
            updateGroupsBar(); // Update bar after setting new groups
        }
    };
})();

// Example usage
// Initialize groups
GroupsManager.setGroups([{ id: 1, name: 'Family' }, { id: 2, name: 'Friends' }]);
