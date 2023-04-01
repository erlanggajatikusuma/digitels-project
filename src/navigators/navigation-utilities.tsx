import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(id: string, name: any, params?: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

export function resetRoot(rootStack: any = {index: 0, routes: []}) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot({...rootStack});
  }
}
