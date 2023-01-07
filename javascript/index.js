// Model
    let h1 = 'Exercise Tracker';
    let h3 = 'Goals';

    let exerciseNames;
    const savedexerciseNames = JSON.parse(localStorage.getItem('RealExerciseNames3'));

    if(Array.isArray(savedexerciseNames)) {
        exerciseNames = savedexerciseNames;
    } else {
        exerciseNames = [{
            name: 'Twenty Forward Knee Lunges (Both Knees)',
            dueDate: '2023-09-01',
            id: 'id1'
        }, {
            name: 'Twenty Backward Knee Lunges (Both Knees)',
            dueDate: '2023-09-01',
            id: 'id2'
        }, {
            name: 'Two Sets of Twelve Knee Raises',
            dueDate: '2023-09-01',
            id: 'id3'
        }, {
            name: 'Twenty Squats After Every Set of Lunges',
            dueDate: '2023-09-01',
            id: 'id4'
        }]
    }

    const createExercise = (name, dueDate) => {
        const id = '' + new Date().getTime();

        exerciseNames.push({
            name: name,
            dueDate: dueDate,
            id: id
        });

        saveExerciseNames();
    }

    const removeExercise = (idToDelete) => {
        exerciseNames = exerciseNames.filter(exerciseName => {
            if (exerciseName.id === idToDelete) {
                return false;
            } else {
                return true;
            }
        });

        saveExerciseNames();
    }

    const toggleExerciseNames = (exerciseNameId, checked) => {
        exerciseNames.forEach(function (exerciseName) {
            if (exerciseName.id === exerciseNameId) {
                exerciseName.isDone = checked;
            }
        });

        saveExerciseNames();
    }

    const saveExerciseNames = () => {
        localStorage.setItem('RealExerciseNames3', JSON.stringify(exerciseNames));
    }

// Controller

    const middleSectionHeader = (middleSectionHeaderh1) => {
        let title = document.createElement('h1');
        title.setAttribute('class', 'middle-header-title');
        title.innerText = middleSectionHeaderh1;
        document.getElementById('middle-section').appendChild(title);
    }

    const rightSectionHeader = () => {
        let title = document.createElement('h3');
        title.setAttribute('class', 'right-header');
        title.setAttribute('id', 'right-header-goals');
        title.innerHTML = '';
        document.getElementById('right-section').appendChild(title);
    }

    const rightSectionHeaderLink = (rightSectionHeaderh3link) => {
        let title = document.createElement('a');
        title.setAttribute('class', 'right-header-link');
        title.setAttribute('href', '#');
        title.innerText = rightSectionHeaderh3link;
        document.getElementById('right-header-goals').appendChild(title);
    }

    const addExercise = () => {
        const textbox = document.getElementById('add-new-exercise');
        const name = textbox.value;

        const datePicker = document.getElementById('add-due-date');
        const dueDate = datePicker.value;

        createExercise(name, dueDate);
        render();
    }

    const deleteExercise = event => {
        const deleteButton = event.target;
        const idToDelete = deleteButton.id;

        removeExercise(idToDelete);
        render();
    }

    const checkExercise = (event) =>{
        const checkbox = event.target;
        
        const exerciseNameId = checkbox.dataset.exerciseNameId;
        const checked = checkbox.checked;

        toggleExerciseNames(exerciseNameId, checked);
        render();
    } 

// View
    middleSectionHeader(h1);
    rightSectionHeader();
    rightSectionHeaderLink(h3);

    const render = () => {

        document.getElementById('exercise-list').innerHTML = '';

        exerciseNames.forEach(exerciseName => {
            const element1 = document.createElement('label');
            element1.innerText = exerciseName.name;
            element1.setAttribute('class', 'exercise-text');
            element1.setAttribute('id', 'exercise-text');
            element1.setAttribute('for', 'checkbox');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.onchange = checkExercise;
            checkbox.setAttribute('class', 'check-box');
            checkbox.setAttribute('name', 'checkbox');
            checkbox.dataset.exerciseNameId = exerciseName.id;
            if (exerciseName.isDone === true) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
            element1.prepend(checkbox);
    
            const exerciseList = document.getElementById('exercise-list');
            exerciseList.appendChild(element1);
        })

        document.getElementById('date-tracker-list').innerHTML = ''; 

        exerciseNames.forEach(exerciseName => {
            const element2 = document.createElement('p');
            element2.innerText = exerciseName.dueDate;
            element2.setAttribute('class', 'date-text');
            const exercise1List = document.getElementById('date-tracker-list');
            exercise1List.appendChild(element2);
        })

        document.getElementById('deleteButtons').innerHTML = '';

        exerciseNames.forEach(exerciseName => {
            const deleteButton = document.createElement('button');
            deleteButton.innerText = "Remove";
            deleteButton.setAttribute('class', 'delete-buttons');
            deleteButton.setAttribute('type', 'button');
            deleteButton.onclick = deleteExercise;
            deleteButton.id = exerciseName.id;
            const element3 = document.getElementById('deleteButtons');
            element3.appendChild(deleteButton);

            if (exerciseName.isDone === true) {
                deleteButton.disabled = false;
            } else {
                deleteButton.disabled = true;
                deleteButton.innerText = 'Do the Work';
            }
        })
    }

    render();
   
