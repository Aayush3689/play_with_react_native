import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import FloatButton from '../buttons/FloatButton.jsx';
import Icon from '@component/icons/Icons.jsx';
import { useTaskActions } from '@hooks/tasks/useTaskActions.js';

const { width, height } = Dimensions.get('window');

const FormModal = ({ onClose, visible }) => {
  const { handleAddTask } = useTaskActions();

  // react hook form setup.....
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
    },
  });

  // form data submit function handler....
  const onSubmit = async data => {
    try {
      const task = {
        status: 'pending',
        ...data,
      };

      // add the task and close the modal
      handleAddTask(task);
      onClose();
    } catch (error) {
      console.log('error in onSubmit', error);
      return error;
    }
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <Animated.View style={styles.modalBox}>
          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  {/* label */}
                  <View style={styles.label}>
                    <Icon
                      name={'pencil-square'}
                      type={'FontAwesome'}
                      color={'#000'}
                      size={20}
                    />
                    <Text style={styles.labelText}>What is to be done?</Text>
                  </View>

                  {/* input */}
                  <TextInput
                    placeholder="Enter your Task"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    style={styles.TextInput}
                    multiline={true}
                  />
                </View>
              )}
            />

            <View style={styles.errorBox}>
              {errors.task && (
                <Text style={styles.errorMsg}>This field is required</Text>
              )}
            </View>

            {/* submit button */}
            <FloatButton actions={[handleSubmit(onSubmit)]}>
              <Text style={styles.addBtnText}>Add</Text>
            </FloatButton>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FormModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.09)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBox: {
    width: width * 0.7,
    height: height * 0.6,
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  formContainer: {
    padding: 15,
    flex: 1,
  },

  TextInput: {
    borderBottomWidth: 1,
    borderColor: '#0000003d',
    fontSize: 12,
  },

  errorBox: {
    alignItems: 'flex-end',
  },

  errorMsg: {
    color: 'red',
    fontSize: 10,
  },

  submitBtn: {
    backgroundColor: '#e6be0aff',
    padding: 10,
    borderRadius: 5,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },

  btnText: {
    color: '#fff',
  },

  addBtnText: {
    color: '#fff',
  },

  label: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  labelText: {
    fontSize: 16,
    marginLeft: 5,
  },
});
