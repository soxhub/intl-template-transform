export default class Container extends Component {
  canDrag = false;
  canResize = false;
  canFullscreen = true;
  isFocused = false;
  isFullscreen = false;
  resizableHandles = 'ne, nw, se, sw, n, e, s, w';
}