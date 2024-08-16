document.addEventListener('DOMContentLoaded', () => {
    const viewModeButton = document.getElementById('view-mode');
    const editModeButton = document.getElementById('edit-mode');
    const calendarContainer = document.getElementById('calendar-container');
    const scheduleModal = document.getElementById('schedule-modal');
    const addScheduleButton = document.getElementById('add-schedule');
    const saveScheduleButton = document.getElementById('save-schedule');
    const cancelButton = document.getElementById('cancel');
    const scheduleDateInput = document.getElementById('schedule-date');
    const scheduleDescriptionInput = document.getElementById('schedule-description');
    const modalTitle = document.getElementById('modal-title');
    
    let editMode = false;
    
    viewModeButton.addEventListener('click', () => {
        editMode = false;
        calendarContainer.classList.remove('hidden');
        renderCalendar();
        scheduleModal.classList.add('hidden');
    });

    editModeButton.addEventListener('click', () => {
        editMode = true;
        calendarContainer.classList.remove('hidden');
        renderCalendar();
        scheduleModal.classList.add('hidden');
    });

    addScheduleButton.addEventListener('click', () => {
        modalTitle.textContent = '일정 추가';
        scheduleDateInput.value = '';
        scheduleDescriptionInput.value = '';
        scheduleModal.classList.remove('hidden');
    });

    cancelButton.addEventListener('click', () => {
        scheduleModal.classList.add('hidden');
    });

    saveScheduleButton.addEventListener('click', () => {
        const date = scheduleDateInput.value;
        const description = scheduleDescriptionInput.value;
        if (date && description) {
            addSchedule(date, description);
            scheduleModal.classList.add('hidden');
            renderCalendar();
        } else {
            alert('날짜와 일정을 입력해주세요.');
        }
    });

    function renderCalendar() {
        // Clear previous calendar content
        const calendar = document.getElementById('calendar');
        calendar.innerHTML = '';

        const today = new Date();
        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const formattedDate = date.toISOString().split('T')[0];

            const row = document.createElement('tr');
            const cellDate = document.createElement('td');
            cellDate.textContent = formattedDate;
            row.appendChild(cellDate);

            const cellSchedule = document.createElement('td');
            const scheduleList = document.createElement('ul');
            scheduleList.className = 'schedule-item';

            const schedules = getSchedulesForDate(formattedDate);
            schedules.forEach(schedule => {
                const listItem = document.createElement('li');
                listItem.textContent = schedule;
                if (editMode) {
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = '삭제';
                    deleteButton.addEventListener('click', () => {
                        deleteSchedule(formattedDate, schedule);
                        renderCalendar();
                    });
                    listItem.appendChild(deleteButton);

                    const editButton = document.createElement('button');
                    editButton.textContent = '수정';
                    editButton.addEventListener('click', () => {
                        modalTitle.textContent = '일정 수정';
                        scheduleDateInput.value = formattedDate;
                        scheduleDescriptionInput.value = schedule;
                        scheduleModal.classList.remove('hidden');
                    });
                    listItem.appendChild(editButton);
                }
                scheduleList.appendChild(listItem);
            });

            cellSchedule.appendChild(scheduleList);
            row.appendChild(cellSchedule);
            calendar.appendChild(row);
        }
    }

    function getSchedulesForDate(date) {
        // Dummy data - replace with actual data storage logic
        return JSON.parse(localStorage.getItem(date)) || [];
    }

    function addSchedule(date, description) {
        const schedules = getSchedulesForDate(date);
        schedules.push(description);
        localStorage.setItem(date, JSON.stringify(schedules));
    }

    function deleteSchedule(date, description) {
        const schedules = getSchedulesForDate(date);
        const updatedSchedules = schedules.filter(schedule => schedule !== description);
        localStorage.setItem(date, JSON.stringify(updatedSchedules));
    }
});
