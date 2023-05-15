const OPACITY_STEP = 100;
FIRST_TIMEOUT = 800;
SECOND_TIMEOUT = 4000;
MINIMUM_PERCENTAGE_OF_LANGAGE = 5

var colors={'Python': 'bg-[#3572A5]' , 'HTML': 'bg-[#e44b23]', 'CSS': 'bg-[#563d7c]','Java': 'bg-[#b07219]',"JavaScript": 'bg-[#f1e05a]', }

function init() {

    
    new fullpage('#fullpage', {
        autoScrolling: true,
        scrollHorizontally: true,
        navigation:true,
        slidesNavigation:true,
        slidesNavPosition:"bottom",
        showActiveTooltip:true,

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

    projectsUrls = getProjectsUrl()
    
    for (var projectUrl in projectsUrls){
        updateGithubDiv(generateLangageUrl(projectsUrls[projectUrl]), projectUrl)
    }




}


function generateLangageUrl(projectUrl){
    return projectUrl.replace("github.com", "api.github.com/repos") + "/languages"
}
function getProjectsUrl(){
    const elements = document.querySelectorAll('.github-link');
    const links =[]

    elements.forEach(element => {
        links.push(element.href)
      });
    return links

}
function updateGithubDiv(projectsUrl, indexOfPage){
    var xhr = new XMLHttpRequest();
    console.log(projectsUrl)
    xhr.open("GET", projectsUrl);
    xhr.setRequestHeader("Accept", "application/vnd.github.v3+json");

    xhr.onload = function () {
        var languagesStats = JSON.parse(xhr.responseText);

        totalSize = sizeOfProject(languagesStats)

        var stats = {};
        for (var langage in languagesStats) {
            var bytes = languagesStats[langage];
            var percentage = ((bytes / totalSize) * 100).toFixed(1);
            stats[langage] = percentage
        }
        showLangageStats(stats, indexOfPage)
        
    }
    xhr.send();
}
function sizeOfProject(languagesStats){
    
    var totalSize = 0;
    for (var langage in languagesStats) {
        totalSize += languagesStats[langage];
    }
    return totalSize
}

function showLangageStats(stats, indexOfPage){
    section = getLangageSection(indexOfPage)
    const bar = document.createElement("div");
    const legend = document.createElement("div");
    legend.classList.add("flex", "justify-between")
    bar.classList.add("flex", "justify-center", "items-center", "rounded", "overflow-hidden");
    for (var langage in stats){
        bar.appendChild(generateLangageDiv(langage, stats[langage]));
        legend.appendChild(generateLangageLegend(langage, stats[langage]))
    }

    section.appendChild(bar)
    section.appendChild(legend)
}

function getLangageSection(indexOfPage){
    langSections =  document.querySelectorAll('.lang-section')
    return langSections[indexOfPage]
}

function generateLangageLegend(langage, percentage){
    const div = document.createElement("div");
    div.classList.add("inline-flex", "items-center" ,"text-center" ,"text-normal" , "leading-lg", "text-primary-100");

    const point = document.createElement("span");
    point.classList.add("w-2",  "h-2",  "inline-block" , colors[langage] ,  "rounded-full",  "mr-2");
    const legend = document.createElement("span");
    legend.classList.add("text-white", "text-xs", "lg:text-sm");
    legend.textContent = langage;

    div.appendChild(point);
    div.appendChild(legend);

    if (percentage <= MINIMUM_PERCENTAGE_OF_LANGAGE){
        legend.classList.add("hidden", "lg:block")
        point.classList.add("hidden", "lg:block")
    }
    return div;
}

function generateLangageDiv(langage, percentage){
    const div = document.createElement("div");
    div.classList.add(colors[langage], "bg-opacity-50" ,"text-center" ,"text-normal" , "leading-lg", "text-primary-100");
    div.style.minWidth = percentage + "%"; 
    const span = document.createElement("span");
    span.classList.add("uppercase", "text-xs", "lg:text-base" );

    if (percentage > MINIMUM_PERCENTAGE_OF_LANGAGE){
        span.textContent = percentage + "%";
        
    }

    else{
        span.textContent = '\u{00A0}';
        div.classList.add("hidden", "lg:block")
    }

    
    div.appendChild(span);
    return div
}


async function fadeIn(element, timeout) {
    await new Promise(r => setTimeout(r, timeout));
    for (i = 0; i < OPACITY_STEP; ++i) {
        element.style.opacity = i / OPACITY_STEP;
        await new Promise(r => setTimeout(r, 1));
    }
}

async function fadeOut(element, timeout) {
    await new Promise(r => setTimeout(r, timeout));
    for (i = 0; i <= 1; i=i+0.01) {
        console.log(1 - i);
        element.style.opacity = 1 - i ;
        await new Promise(r => setTimeout(r, 1));
    }
}
