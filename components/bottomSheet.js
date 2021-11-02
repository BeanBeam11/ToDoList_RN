export const renderInner = (props) => (
    <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>Choose Your Photo</Text>
        </View>
        <TouchableOpacity style={styles.panelButtonNormal} onPress={takePhotoFromCamera}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButtonNormal} onPress={choosePhotoFromLibrary}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelButtonDanger} onPress={()=> bsRef.current.snapTo(1)}>
            <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
    </View>
);

export const renderHeader = (props) => (
    <View style={styles.header}>
        <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
        </View>
    </View>
);


const btnColor = {
    normal: {
      backgroundColor: '#55BCF6',
    },
    danger: {
      backgroundColor: '#f65555',
    }
}

const styles = StyleSheet.create({
    header: {
    backgroundColor: '#FFF',
    shadowColor: '#808080',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10
  },
  panel: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%'
  },
  panelTitle: {
    fontSize: 24,
    paddingTop: 10,
    paddingBottom: 5,
  },
  panelSubtitle: {
    color: '#808080',
    paddingBottom: 10
  },
  panelButtonNormal: {
    width: '70%',
    paddingVertical: 15,
    backgroundColor: btnColor.normal.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: '15%',
    marginVertical: 5
  },
  panelButtonDanger: {
    width: '70%',
    paddingVertical: 15,
    backgroundColor: btnColor.danger.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginHorizontal: '15%',
    marginVertical: 5
  },
  panelButtonTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  }
});