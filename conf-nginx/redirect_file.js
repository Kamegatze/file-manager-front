function redirect(r) {
    const allSubUri = r.uri.split("/");
    return "/" + allSubUri[allSubUri.length - 1];
}

export default {redirect};