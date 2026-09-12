// 今日の営業時間を営業時間表から引いて、上の帯に出す。
// 祝日判定はしない。平日扱いの日には「祝日は土日祝の時間」と注記を出す。
// JSが動かなければ帯には既定の文言が残り、表は普通に読める。
(function () {
  var now = new Date();
  var m = now.getMonth() + 1;
  var d = now.getDay();
  var rows = document.querySelectorAll('.tt tbody tr');
  var row = null;
  for (var i = 0; i < rows.length; i++) {
    var months = rows[i].getAttribute('data-months').split(',');
    if (months.indexOf(String(m)) >= 0) row = rows[i];
  }
  if (!row) return;
  row.className += ' now';

  var status = document.querySelector('[data-today-status]');
  var note = document.querySelector('[data-today-note]');
  var label = ['日', '月', '火', '水', '木', '金', '土'][d];
  var dateStr = m + '月' + now.getDate() + '日(' + label + ')';

  if (m === 1) {
    status.textContent = dateStr + ' は1月のため全休です';
    return;
  }
  var isWeekend = (d === 0 || d === 6);
  var rest = row.querySelector('.rest').textContent;
  if (d === 2 && rest.indexOf('火曜定休') >= 0) {
    status.textContent = dateStr + ' は火曜定休です';
    return;
  }
  var time = row.children[isWeekend ? 2 : 1].textContent;
  status.textContent = dateStr + ' ' + time;
  note.textContent = isWeekend
    ? '臨時休業はFacebookをご確認ください。'
    : '祝日は土日祝の時間になります。臨時休業はFacebookをご確認ください。';
})();
