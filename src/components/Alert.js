import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import Container from "./Container";
import Button from "./Button";
import Block from "./Block";
import Modal from "react-native-modal";
import { colors, text } from "./styles";

class Alert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: props.isVisible
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { ...props };
  }

  closeModal = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  render() {
    return (
      <Modal isVisible={this.state.isVisible} onBackdropPress={this.closeModal}>
        <Container centerContent noPaddingAndMargin>
          <Block column style={styles.modalWrapper}>
            <Text
              style={[text.medium, text.fontSemiRegular, styles.modalTitle]}
            >
              {this.state.title}
            </Text>
            <Text style={[text.regular, text.paragraph, styles.modalContent]}>
              {this.state.text}
            </Text>
            {this.props.allowCancelAndConfirm === true ? (
              <Block row>
                <Button
                  textLight
                  red
                  half
                  style={{ borderRadius: 0, borderBottomLeftRadius: 5 }}
                  onPress={this.props.onClosePress}
                >
                  Tutup
                </Button>
                <Button
                  textLight
                  half
                  style={{ borderRadius: 0, borderBottomRightRadius: 5 }}
                  onPress={() => {
                    this.closeModal();
                    this.props.onClosePress();
                    this.props.onConfirm();
                  }}
                >
                  Oke
                </Button>
              </Block>
            ) : (
              <Button
                block
                textLight
                noTopRound
                onPress={() => {
                  this.closeModal();

                  if ("onClosePress" in this.props) {
                    this.state.onClosePress();
                  }
                }}
              >
                Tutup
              </Button>
            )}
          </Block>
        </Container>
      </Modal>
    );
  }
}

export default Alert;

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
