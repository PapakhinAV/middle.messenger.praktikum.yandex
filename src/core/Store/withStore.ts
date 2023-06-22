import Block from '../Block';
import store, { StoreEvents } from './Store';
import isObjectsEqual from '../../utils/isObjectsEqual';

export function withStore<T>(mapStateToProps: (state: any) => any) {
  return function wrap(Component: typeof Block<T>) {
    let previousState: any;

    return class WithStore extends Component {
      constructor(props: any) {
        previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });
        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());
          if (!isObjectsEqual(previousState, stateProps)) {
            previousState = stateProps;
            this.setProps({ ...stateProps });
          }
        });
      }
    };
  };
}
