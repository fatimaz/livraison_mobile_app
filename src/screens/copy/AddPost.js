import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button, Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

import { addPost } from '../actions';

import Colors from '../constants/Colors';

// create a component
class AddPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            imageName: '',
            postImage: '',
            disabled: true
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.added) {
            this.props.navigation.goBack();
        }
    }


    showErrorMessage() {
        if (this.props.error) {
            return (
                <View style={styles.containerWithMargin}>
                    <Text style={styles.errorMessage}>{this.props.error}</Text>
                </View>
            );
        }
    }

    onSelectPostImage() {
        const options = {
            title: 'Select Image to share',
            quality: 0.1, //Image quality 0 lowest , 1 heights
            mediaType: 'photo',
            maxHeight: 200 // Speed up android loading
        };

        ImagePicker.showImagePicker(options, (response) => {
            if (response) {
                const imageName ='SS';
                // `${this.props.profile.id}-${response.fileName}`;
                this.setState({
                    postImage: response.uri,
                    imageName,
                    disabled: false
                });
            } else {
                this.setState({ disabled: true });
            }
        });
    }

    onShareButtonPressed() {
        const { postImage, imageName, title } = this.state;
        const from = 'k';
        const to = 'k';

        this.props.addPost(from, to,  postImage);
    }

    render() {
        return (
            <View>
                <View style={styles.containerWithMargin} >
                    <Avatar
                        large
                        rounded
                     
                        onPress={this.onSelectPostImage.bind(this)}
                        source={{ uri: this.state.postImage }}
                    />
                </View>

          
                <Input
                    autoCorrect={false}
                    autoFocus
                    onChangeText={(title) => this.setState({ title })}
                />

                {this.showErrorMessage()}

                <Button
                    title='Share'
                    backgroundColor={Colors.redColor}
                    buttonStyle={{ marginTop: 20 }}
                    disabled={this.state.disabled}
                    onPress={this.onShareButtonPressed.bind(this)}
                    loading={this.props.loading}
                />

            </View>
        );
    }
}


const styles = StyleSheet.create({
    containerWithMargin: {
        marginVertical: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'red'
    },
    errorMessage: {
        color: Colors.redColor,
        fontSize: 16
    }
});


const mapStateToProps = state => {
    return {
      
        loading: state.posts.loading,
        error: state.posts.error,
        added: state.posts.added
    };
};

//make this component available to the app
export default connect(mapStateToProps, { addPost })(AddPost);