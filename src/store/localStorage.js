

export let checkDropVote = function (flagDB){

    const flagLS = parseInt(localStorage.getItem('dropVote'));

    if(flagLS && flagLS < flagDB){
        localStorage.removeItem('KeDc_tTenn65M2cyAiK_liked');
        localStorage.removeItem('KeDc_tTenn65M2cyAiK_id_liked');
    }
    localStorage.setItem('dropVote', flagDB);
};


export let getLikedId = function () {
    return localStorage.getItem('KeDc_tTenn65M2cyAiK_id_liked');
};
export let removeLikedId = function () {
    localStorage.removeItem('KeDc_tTenn65M2cyAiK_id_liked');
};
export let setLikedId = function(id) {
    localStorage.setItem('KeDc_tTenn65M2cyAiK_id_liked', id);
};
export let isAdmin = function() {
    return localStorage.getItem('user') === 'Maxim';
};
