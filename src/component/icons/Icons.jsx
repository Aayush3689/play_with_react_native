import { FontAwesome } from '@react-native-vector-icons/fontawesome';

const Icon = ({ name, type, color, size, rest }) => {
  const icons = {
    FontAwesome,
  };

  const IconComponent = icons[type];
  return <IconComponent name={name} color={color} size={size} {...rest} />;
};

export default Icon;
