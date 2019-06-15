const openCloseTiming = 'cubic-bezier(1,0,0,1)';
const animationDuration = '0.5s';
const transitionProps = ['top', 'opacity', 'padding', 'height', 'z-index', 'flex-grow'];

const styles = {
  open: {
    transitionProperty: transitionProps,
    transitionTimingFunction: openCloseTiming,
    transitionDuration: animationDuration,
    position: 'relative',
    top: '0px',
    opacity: '1',
    zIndex: '2',
    flexGrow: '1',
    padding: '7px',
    height: '2em',
  },
  closed: {
    transitionProperty: transitionProps,
    transitionTimingFunction: openCloseTiming,
    transitionDuration: animationDuration,
    position: 'relative',
    top: '0px',
    opacity: '1',
    zIndex: '1',
    flexGrow: '0',
    padding: '7px',
    height: '2em',
  },
  hiddenAbove: {
    transitionProperty: transitionProps,
    transitionTimingFunction: openCloseTiming,
    transitionDuration: animationDuration,
    position: 'relative',
    top: '-250px',
    opacity: '0',
    zIndex: '1',
    flexGrow: '0',
    padding: '0px',
    height: '0px',
  },
  hiddenBelow: {
    transitionProperty: transitionProps,
    transitionTimingFunction: openCloseTiming,
    transitionDuration: animationDuration,
    position: 'relative',
    top: '250px',
    opacity: '0',
    zIndex: '1',
    flexGrow: '0',
    padding: '0px',
    height: '0px',
  },
};

export const fileAnimationStyles = styles;
