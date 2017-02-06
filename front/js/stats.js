var needToUpdate = true;

function reTemplateStats(ranks) {
    var votessum = 0;
    var groupModels = [];
    for (var i=0; i<ranks.length; i++) {
        votessum += ranks[i].votes;
    }
    for (var i=0; i<ranks.length; i++) {
        groupModels.push({
            group: ranks[i].readable_name,
            votes: ranks[i].votes,
            percentage: Math.floor(ranks[i].votes * 100 / votessum)
        });
    }
    $('.results').html('')
        .append($.tmpl($('.results-template').html(), {
            ranks: groupModels,
            votessum: votessum
        }));
}

function updateStatsTick() {
    if (!needToUpdate)
        return;
    $.ajax("/stats/json", {
        success: reTemplateStats
    });
}

function setHeightOfResultsSpace() {
    var heightOfWindow = $(window).height();
    var heightOfSign = $('.site-link').outerHeight();
    setTimeout(function () {
        $('.results').height(0).height(heightOfWindow - heightOfSign - 30);
    }, 5);
}

$(window).on('load', function () {
   if (!$('.results').length)
       return;
    $(window).on('keydown', function (e) {
        if (e.which == 32)
            needToUpdate = !needToUpdate;
            console.log('Need To Update now is ' + needToUpdate);
    });
    setHeightOfResultsSpace();
    $(window).on('resize', setHeightOfResultsSpace);
    updateStatsTick();
    setInterval(updateStatsTick, 3000);
});