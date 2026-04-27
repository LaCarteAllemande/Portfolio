

function init() {

    
    new fullpage('#fullpage', {
        licenseKey: 'gplv3-license',
        autoScrolling: true,
        scrollHorizontally: true,
        navigation:true,
        slidesNavigation:true,
        slidesNavPosition:"bottom",
        scrollOverflow: false,
        showActiveTooltip:true,
        anchors:['home', 'education', 'experience', 'hardskills', 'project-section', 'softskills',  'contact'],

        controlArrows: false,
        afterRender: function() {
            let leftArrows = document.getElementsByClassName('arrow-l');
            leftArrows = [...leftArrows];
            leftArrows.forEach(function(arrow) {
                arrow.addEventListener('click', function() {
                    fullpage_api.moveSlideLeft();
                });
            });

            let rightArrows = document.getElementsByClassName('arrow-r');
            rightArrows = [...rightArrows];
            rightArrows.forEach(function(arrow) {
                arrow.addEventListener('click', function() {
                    fullpage_api.moveSlideRight();
                });
            });          
        },
        
    });
}
