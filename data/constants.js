export const GROUP = {
  fromis: 'fromis',
  newjeans: 'newjeans',
  joyuri: 'joyuri',
  lesserafim: 'lesserafim'
}

export const GROUP_NAME = {
  [GROUP.fromis]: 'fromis_9',
  [GROUP.newjeans]: 'NewJeans',
  [GROUP.joyuri]: 'Jo Yuri',
  [GROUP.lesserafim]: 'LE SSERAFIM'
}

export const GROUP_DATA = [{
  name: GROUP_NAME[GROUP.fromis],
  code: GROUP.fromis,
  link: `/${GROUP.fromis}`,
  disabled: false,
}, {
  name: GROUP_NAME[GROUP.newjeans],
  code: GROUP.newjeans,
  link: `/${GROUP.newjeans}`,
  disabled: false,
}, {
  name: GROUP_NAME[GROUP.joyuri],
  code: GROUP.joyuri,
  link: `/${GROUP.joyuri}/jyr`,
  disabled: false,
}, {
  name: GROUP_NAME[GROUP.lesserafim],
  code: GROUP.lesserafim,
  link: `/`,
  disabled: true,
}]

export const PRIMARY_COLOR = {
  [GROUP.fromis]: '#c08380',
  [GROUP.newjeans]: '#1560bd',
  [GROUP.joyuri]: '#f34951',
  [GROUP.lesserafim]: '#81a5f9'
}

export const getPrimaryColor = (group) => {
  return PRIMARY_COLOR[group] ?? 'lightslategrey'
}
