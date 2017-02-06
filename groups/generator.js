var VKApi = require('vk-io');

var GROUPS = [
    ['mathmech', 'math_mech'],
    ['mt-101', 'club126310380'],
    ['mt-102', 'krytaya.ssylka'],
    ['pi-101', 'club126310030'],
    ['pi-102', 'club126322044'],
    ['pi-103', 'imkn_pi103'],
    ['ft-101', 'club126321437'],
    ['ft-102', 'fundamental102'],
    ['ft-103', 'fundamentality103'],
    ['mx-101', 'mh__2016'],
    ['kn-101', 'club_kn101'],
    ['kn-102', 'kn102'],
    ['kn-103', 'kn103_imkn_urfu_2016'],
    ['kb-101', 'club126308903']
];

var idToGroupMap = {};

function workWithFirstElement() {
    if (GROUPS.length == 0) {
        console.log(JSON.stringify(idToGroupMap));
        return;
    }
    var el = GROUPS.shift();
    var id = el[0];
    var link = el[1];

    var VK = new VKApi();
    VK.setting({
        app: 4391687,
        login: 'sosi@pis.os',
        pass: 'securepass',
        phone: '+79126873767'
    });
    var auth = VK.standloneAuth();
    return auth.run()
        .then(token => {
            VK.setToken(token);
            return VK.api.groups.getById({group_ids: link})
                .then(groupInfo => {
                    return VK.stream.groups.getMembers({group_id: groupInfo[0].id})
                        .then(ids => {
                            ids.forEach(userid => idToGroupMap[userid] = id);
                            return workWithFirstElement();
                        });
                });
        });
}

workWithFirstElement()
    .catch(e => console.log(e));