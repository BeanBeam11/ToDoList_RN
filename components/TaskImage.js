import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const TaskImage = (props) =>{
    return(
        <View style={styles.photobox}>
            {props.image && <Image source={{ uri: props.image }} style={styles.photoItem} />}
        </View>
    )
}

const styles = StyleSheet.create({
    photobox: {
        width: 150,
        marginLeft: 39,
    },
    photoItem: {
        width: 150,
        height: 200,
        marginTop: 10
    }
});

export default TaskImage;