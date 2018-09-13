function isLength(val) {
    return (
        typeof value == 'number' &&
        val > -1 &&
        val % 1 == 0 &&
        val < Number.Max_SAFE_INTEGER
    );
}
