const openCloseTiming = 'cubic-bezier(1,0,0,1)';
const animationDuration = '0.5s';

const staticStyles = {
  open: {
    animationName: 'OpenFile',
    animationTimingFunction: openCloseTiming,
    animationDuration: animationDuration,
    position: 'relative',
    top: '0px',
    opacity: '1',
    zIndex: '2',
    flexGrow: '1',
    padding: '7px',
    height: '2em',
  },
  closed: {
    position: 'relative',
    top: '0px',
    opacity: '1',
    zIndex: '1',
    flexGrow: '0',
    padding: '7px',
    height: '2em',
  },
  closing: {
    animationName: 'ClosingFile',
    animationTimingFunction: openCloseTiming,
    animationDuration: animationDuration,
  },
  hiddenAbove: {
    animationName: 'HiddenAbove',
    animationTimingFunction: 'ease-out',
    animationDuration: animationDuration,
    position: 'relative',
    top: '-250px',
    opacity: '0',
    zIndex: '1',
    padding: '0px',
    height: '0px',
    padding: '0px',
  },
  hiddenBelow: {
    animationName: 'HiddenBelow',
    animationTimingFunction: 'ease-out',
    animationDuration: animationDuration,
    position: 'relative',
    top: '250px',
    opacity: '0',
    zIndex: '1',
    padding: '0px',
    height: '0px',
    padding: '0px',
  },
  unhidingAbove: {
    animationName: 'UnhidingAbove',
    animationTimingFunction: 'ease-in',
    animationDuration: animationDuration,
  },
  unhidingBelow: {
    animationName: 'UnhidingBelow',
    animationTimingFunction: 'ease-in',
    animationDuration: animationDuration,
  },
};

const transitions = {
  '@keyframes OpenFile': {
    from: staticStyles.closed,
    to: staticStyles.open,
  },
  '@keyframes ClosingFile': {
    from: staticStyles.open,
    to: staticStyles.closed,
  },
  '@keyframes HiddenAbove': {
    from: staticStyles.closed,
    to: staticStyles.hiddenAbove,
  },
  '@keyframes HiddenBelow': {
    from: staticStyles.closed,
    to: staticStyles.hiddenBelow,
  },
  '@keyframes UnhidingAbove': {
    from: staticStyles.hiddenAbove,
    to: staticStyles.closed,
  },
  '@keyframes UnhidingBelow': {
    from: staticStyles.hiddenBelow,
    to: staticStyles.closed,
  },
}

export const fileAnimationStyles = Object.assign({}, staticStyles, transitions);
