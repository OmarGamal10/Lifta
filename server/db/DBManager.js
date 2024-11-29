const db = require(".././db");

exports.executeScalar = async query => {
    try {
        const count = await db.query(query);
        return parseInt(count.rows[0].count, 10);
    }
    catch (err) {
        console.error("Error while executeScalar:", err);
        return 0;
    }
}

exports.executeNonQuery = async (query, values) => {
    try {
        await db.query(query, values);
    }
    catch (err) {
        console.error("Error while executeNonQuery:", err);
        throw err;
    }
}

exports.executeReader = async (query, values) => {
    try {
        return await db.query(query, values);
    }
    catch (err) {
        console.error("Error while executeReader:", err);
        return 0;
    }
}