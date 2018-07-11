$(document).on('o:prepare-value', function(e, type, value) {
    if ('timestamp' === type) {
        var v = value.find('input[data-value-key="@value"]');
        var y = value.find('input[name="timestamp-year"]');
        var m = value.find('select[name="timestamp-month"]');
        var d = value.find('select[name="timestamp-day"]');

        // Set existing year, month, and day during initial load.
        if (v.val()) {
            var date = new Date(v.val() * 1000); // convert s to ms
            y.val(date.getFullYear());
            m.val(date.getMonth());
            d.val(date.getDate());
        }

        y.on('input', function(e) {
            setTimestamp(v, y, m, d);
        });
        m.on('change', function(e) {
            setTimestamp(v, y, m, d);
        });
        d.on('change', function(e) {
            setTimestamp(v, y, m, d);
        });
    }
});

/**
 * Set a timestamp to a value.
 *
 * We store timestamp and not ISO 8601 because the former is a signed integer
 * and thus better suited for simple database comparisons.
 *
 * @param v Value input
 * @param y Year input
 * @param m Month select 
 * @param d Day select 
 */
var setTimestamp = function (v, y, m, d) {
    var year = y.val() ? y.val() : null;
    if (year) {
        var month = m.val() ? m.val() : 0;
        var day = d.val() ? d.val() : 1;
        var timestamp = new Date(year, month, day, 0, 0, 0).getTime();
        v.val(timestamp ? timestamp * .001: null); // convert ms to s
    } else {
        // Date() recognizes a null year, but we don't.
        v.val(null);
    }
}