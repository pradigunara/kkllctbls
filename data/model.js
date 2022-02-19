export default {
  members: [{
    code: 'lng',
    name: 'Lee Nagyung',
    img: '/public/member/lng'
  }],
  eras: [{
    code: 'mg',
    name: 'Midnight Guest',
    img: '/public/era/mg'
  }],
  sections: {
    'mg': [
      {
        code: 'album',
        name: 'Album'
      },
      {
        code: 'fs',
        name: 'Fansign'
      }
    ]
  },
  cards: {
    'lng': {
      'mg': {
        'album': [
          {
            code: 'before-midnight-1',
            name: 'Before Midnight 1',
            memberCode: 'lng',
            eraCode: 'mg',
            sectionCode: 'album',
            img: '/public/card/lng-mg-album-before-midnight-1.jpg'
          },
          {
            code: 'after-midnight-1',
            name: 'After Midnight 1',
            memberCode: 'lng',
            eraCode: 'mg',
            sectionCode: 'album',
            img: '/public/card/lng-mg-album-after-midnight-1.jpg'
          }
        ]
      }
    }
  }
}
