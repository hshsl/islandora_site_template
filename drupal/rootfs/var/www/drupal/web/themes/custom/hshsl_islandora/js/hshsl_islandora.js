(($,Drupal, once) => {
    const btn = document.querySelector("#searchButton");
    const searchBox = document.querySelector("#searchOverlay");
    const closeBtn = document.querySelector(".closeBtn");
    const expandText = document.querySelector('#expand_text');
    const Shuffle = window.Shuffle;
    const element = document.querySelector('.view-top-level-collections .view-content');
    const subject_filters = document.querySelectorAll('#views-exposed-form-top-level-collections-page-1 select#edit-field-subject-general-target-id');
    const type_filters = document.querySelectorAll('#views-exposed-form-top-level-collections-page-1 select#edit-field-resource-type-target-id');
    let current_filters = {
        subject:[],
        type:[]
    };
    let shuffleInstance;
    if (element !== null) {
        shuffleInstance = new Shuffle(element, {
            itemSelector: '.shuffle-item'
        });
    
        subject_filters.forEach((filter) => {
            $(filter).on("select2:select", (e)=>{
                current_filters.subject.push(e.params.data.id);
                runFilters(current_filters);
            });
            $(filter).on("select2:unselect", (e)=>{
                current_filters.subject.splice(current_filters.subject.indexOf(e.params.data.data), 1);
                runFilters(current_filters);
            });
        });

        type_filters.forEach((filter) => {
            $(filter).on("select2:select", (e)=>{
                current_filters.type.push(e.params.data.id);
                runFilters(current_filters);
            });
            $(filter).on("select2:unselect", (e)=>{
                current_filters.type.splice(current_filters.type.indexOf(e.params.data.data), 1);
                runFilters(current_filters);
            });
        });
    }

    function runFilters(filters) {
        shuffleInstance.filter((element) => {
            const subject = element.getAttribute('data-subject').split(',');
            const type = element.getAttribute('data-type').split(',');
            let subject_result = false;
            let type_result = false;

            // Subject filtering
            if (filters.subject.length > 0) {
                for (let i = 0; i < filters.subject.length; i++) {
                    if (JSON.parse(subject).includes(filters.subject[i])) {
                        subject_result = true;
                    }
                }
            } else {
                subject_result = true;
            }

            // Type filtering
            if (filters.type.length > 0) {
                for (let j = 0; j < filters.type.length; j++) {
                    if (JSON.parse(type).includes(filters.type[j])) {
                        type_result = true;
                    }
                }
            } else {
                type_result = true;
            }
            return subject_result && type_result;
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", ()=>{
            searchBox.classList.remove("showing");
        });
    }
    if (btn) {
        btn.addEventListener('click', ()=>{
        searchBox.classList.add("showing");
        });
    }

    if (expandText) {
        expandText.addEventListener('click', () => {
            const text = document.querySelector('.field--name-field-edited-text');
            text.classList.toggle('expanded');
            if (text.classList.contains('expanded')) {
                document.querySelector("#text_button").classList.remove('bi-chevron-down');
                document.querySelector("#text_button").classList.add('bi-chevron-up');
            } else {
                document.querySelector("#text_button").classList.remove('bi-chevron-up');
                document.querySelector("#text_button").classList.add('bi-chevron-down');
            }
        });
    }

})(jQuery, Drupal, once);