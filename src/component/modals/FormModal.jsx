import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import FloatButton from '../buttons/FloatButton.jsx';
import Icon from '@component/icons/Icons.jsx';
import { saveTask, getTasks } from '@utils/Tasks.js';

const { width, height } = Dimensions.get('window');

const FormModal = prop => {
  // scale animation handling....
  const scale = useRef(new Animated.Value(0.5)).current;
  useEffect(() => {
    if (prop.visible) {
      scale.setValue(0.5);
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  // react hook form setup.....
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      task: '',
    },
  });

  // form data submit function handler....
  const onSubmit = async data => {
    await saveTask(data);
    prop.modalVisible = false
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={prop.visible}
      onRequestClose={() => prop.onClose()}
    >
      <View style={styles.backdrop}>
        <Animated.View style={[styles.modalBox, { transform: [{ scale }] }]}>
          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="task"
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
