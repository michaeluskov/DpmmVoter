var mongoose = require('../../node_modules/mongoose');
var Group = require('../group');

mongoose.connect('mongodb://misha:mishamongo@localhost/dpmm2016');

var GROUPS = [
      new Group({
          _id: 'mathmech',
          name: 'mathmech',
          readable_name: 'Старшенький',
          is_participant: false
      }),
    new Group({
        _id: 'mt-101',
        name: 'mt-101',
        readable_name: 'МТ-101',
        description: 'МОЛОКО и пенная вечеринка',
        is_participant: true
    }),
    new Group({
        _id: 'mt-102',
        name: 'mt-102',
        readable_name: 'МТ-102',
        description: 'Клип в обратной перемотке',
        is_participant: true
    }),
    new Group({
        _id: 'pi-101',
        name: 'pi-101',
        readable_name: 'ПИ-101',
        description: 'Рыжий парень с группой танцует на фоне разных мест',
        is_participant: true
    }),
    new Group({
        _id: 'pi-102',
        name: 'pi-102',
        readable_name: 'ПИ-102',
        description: 'Одеяла и Sweet Dreams, гитару жалко',
        is_participant: true
    }),
    new Group({
        _id: 'pi-103',
        name: 'pi-103',
        readable_name: 'ПИ-103',
        description: 'ЛУК ЛУК ЛУК',
        is_participant: true
    }),
    new Group({
        _id: 'ft-101',
        name: 'ft-101',
        readable_name: 'ФИИТ-101',
        description: 'Сами спели переделанную песню',
        is_participant: true
    }),
    new Group({
        _id: 'ft-102',
        name: 'ft-102',
        readable_name: 'ФИИТ-102',
        description: "It's my life",
        is_participant: true
    }),
    new Group({
        _id: 'ft-103',
        name: 'ft-103',
        readable_name: 'ФИИТ-103',
        description: 'Шлем виртуальной реальности',
        is_participant: true
    }),
    new Group({
        _id: 'mx-101',
        name: 'mx-101',
        readable_name: 'МХ-101',
        description: 'Потерянный студик',
        is_participant: true
    }),
    new Group({
        _id: 'kn-101',
        name: 'kn-101',
        readable_name: 'КН-101',
        description: 'Неуспешный парень прокачался по учёбе',
        is_participant: true
    }),
    new Group({
        _id: 'kn-102',
        name: 'kn-102',
        readable_name: 'КН-102',
        description: 'Парень убегает от УПИйцев',
        is_participant: true
    }),
    new Group({
        _id: 'kn-103',
        name: 'kn-103',
        readable_name: 'КН-103',
        description: 'Парни на кортах. Противостояние',
        is_participant: true
    }),
    new Group({
        _id: 'kb-101',
        name: 'kb-101',
        readable_name: 'КБ-101',
        description: '"Кошкавидсзади" влияет на финансовое положение',
        is_participant: true
    }),
];

console.log(GROUPS.length);

var promises = Promise.all(GROUPS.map(group => group.save()));

promises.catch(e => console.log(e)).then(() => mongoose.connection.close());