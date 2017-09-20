// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageSrc from './image.png';

export default class App extends Component {
  constructor() {
    super();

    this.animation = new Animated.Value(0);
    this.state = {
      isMenuOpen: false,
    };
  }

  state: {
    isMenuOpen: boolean
  };
  animation: Animated.Value;

  handlePayButtonOnPress = () => {
    const toValue = this.state.isMenuOpen ? 0 : 1;
    Animated.spring(this.animation, {
      toValue,
      friction: 8,
    }).start();

    this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));
  };

  render() {
    const loveButtonStyle = {
      transform: [
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -160],
          }),
        },
      ],
    };

    const hateButtonStyle = {
      transform: [
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -80],
          }),
        },
      ],
    };

    const textStyle = {
      right: this.animation.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [0, 0, 80],
      }),
    };

    const backgroundStyle = {
      transform: [
        {
          scale: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 25],
          }),
        },
      ],
    };

    return (
      <View style={styles.container}>
        <Image
          source={ImageSrc}
          style={styles.mainImage}
          resizeMode={'cover'}
        />
        <Text style={styles.mainText}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </Text>

        <View style={styles.menuContainer}>
          <Animated.View style={[styles.background, backgroundStyle]} />
          <Animated.View
            style={[styles.buttonAndLabelContainer, loveButtonStyle]}
          >
            <Animated.Text style={[styles.buttonText, textStyle]}>
              Love It
            </Animated.Text>
            <TouchableOpacity>
              <View style={[styles.optionsButton]}>
                <Icon name="heart" color="darkgray" size={30} />
              </View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={[styles.buttonAndLabelContainer, hateButtonStyle]}
          >
            <Animated.Text style={[styles.buttonText, textStyle]}>
              Hate It
            </Animated.Text>
            <TouchableOpacity>
              <View style={[styles.optionsButton]}>
                <Icon name="thumbs-o-down" color="darkgray" size={30} />
              </View>
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.buttonAndLabelContainer}>
            <TouchableWithoutFeedback onPress={this.handlePayButtonOnPress}>
              <Animated.View style={[styles.openButton]}>
                <Icon name="plus" color="#FFF" size={30} />
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  mainImage: {
    flex: 1,
    width: null,
    height: null,
  },
  mainText: {
    flex: 3,
  },
  buttonAndLabelContainer: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    overflow: 'visible',
    width: 200,
  },
  buttonText: {
    position: 'absolute',
    right: 90,
    fontSize: 18,
    fontWeight: '500',
    color: '#FFF',
    backgroundColor: 'transparent',
    marginRight: 5,
  },
  openButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  optionsButton: {
    marginRight: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    ...Platform.select({
      android: {
        elevation: 3,
      },
    }),
  },
  optionButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
});
