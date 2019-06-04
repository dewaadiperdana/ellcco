import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import Container from "./Container";
import Button from "./Button";
import Block from "./Block";
import Modal from "react-native-modal";
import { colors, text } from "./styles";

class CustomModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { ...props };
  }

  _closeModal = () => {
    this.setState({ isVisible: false });
  };

  render() {
    return (
      <Modal
        isVisible={this.state.isVisible}
        onBackdropPress={this._closeModal}
      >
        <Container centerContent noPaddingAndMargin>
          <Block column style={styles.modalWrapper}>
            <Text
              style={[text.medium, text.fontSemiRegular, styles.modalTitle]}
            >
              {this.state.title}
            </Text>
            {this.props.children}
            <Button
              block
              textLight
              noTopRound
              onPress={() => {
                this._closeModal();

                if ("onClosePress" in this.props) {
                  this.state.onClosePress();
                }
              }}
            >
              Tutup
            </Button>
          </Block>
        </Container>
      </Modal>
    );
  }
}

export default CustomModal;

const styles = StyleSheet.create({
  modalWrapper: {
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 10
  },
  modalTitle: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.extraLightGrey
  },
  modalContent: {
    padding: 15
  }
});
