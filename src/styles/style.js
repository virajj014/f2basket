const { col1 } = require("./colors");

module.exports = {
    veg: {
        width: 10,
        height: 10,
        borderRadius: 20,
        backgroundColor: 'green',
    },
    nonveg: {
        width: 10,
        height: 10,
        borderRadius: 20,
        backgroundColor: 'red',
    },
    navbtn: {
        backgroundColor: col1,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        borderRadius: 50,
        borderTopLeftRadius: 0,
    },
    navbtnin: {
        color: 'white',
    },
    navbtnout: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
    },
    bottomnav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: col1,
        zIndex: 20,
    }
}