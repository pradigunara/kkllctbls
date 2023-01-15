export const GROUP = {
  fromis: 'fromis',
  newjeans: 'newjeans'
}

export const GROUP_NAME = {
  [GROUP.fromis]: 'fromis_9',
  [GROUP.newjeans]: 'NewJeans',
}

export const GROUP_DATA = [{
    name: GROUP_NAME[GROUP.fromis],
    code: GROUP.fromis
}, {
    name: GROUP_NAME[GROUP.newjeans],
    code: GROUP.newjeans
}]

export const PRIMARY_COLOR = {
  [GROUP.fromis]: '#c08380',
  [GROUP.newjeans]: '#1560bd',
}

export const getPrimaryColor = (group) => {
  return PRIMARY_COLOR[group] ?? 'lightslategrey'
}