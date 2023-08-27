export default function randomId(prefix = "bp_") {
    return (
      prefix + Date.now() + "_" + Math.floor(Math.random() * 9999999999)
    );
};