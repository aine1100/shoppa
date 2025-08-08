import { Colors } from '@/constants/Colors';
import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  backgroundColor?: string;
};

export function ThemedView({ style, backgroundColor, ...otherProps }: ThemedViewProps) {
  const bgColor = backgroundColor || Colors.background;

  return <View style={[{ backgroundColor: bgColor }, style]} {...otherProps} />;
}
