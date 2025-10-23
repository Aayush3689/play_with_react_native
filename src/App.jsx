import { NavigationContainer } from '@react-navigation/native';
import MainNavigaion from './navigations/MainNavigaion';
import { TaskProvider } from '@context/TaskContext';

const App = () => {
  return (
    <TaskProvider>
      <NavigationContainer>
        <MainNavigaion />
      </NavigationContainer>
    </TaskProvider>
  );
};

export default App;
