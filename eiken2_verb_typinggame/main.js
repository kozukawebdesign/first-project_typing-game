// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;
let wordCount = 0;

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const wordCountElement = document.getElementById('wordCount');

// 複数のテキストを格納する配列
const textLists = [
    'expire',
    'endorse',
    'commute',
    'evacuate',
    'facilitate',
    'update',
    'verify',
    'disperse',
    'withhold',
    'arise',
    'enhance',
    'certify',
    'incur',
    'deduct',
    'retrieve',
    'amend',
    'deteriorate',
    'collaborte',
    'terminate',
    'curb',
    'renovate',
    'complement',
    'discontinue',
    'scrub',
    'compile',
    'reinforce',
    'violate',
    'alleviate',
    'emphasize',
    'browse',
    'remit',
    'discard',
    'enforce',
    'clarify',
    'supervise',
    'enlarge',
    'undertake'
];

// ランダムなテキストを表示
const createText = () => {

    // 正タイプした文字列をクリア
    typed = '';
    typedfield.textContent = typed;

    // 配列のインデックス数からランダムな数値を生成する
    let random = Math.floor(Math.random() *textLists.length);

    // 配列からランダムにテキストを取得し画面に表示する
    untyped = textLists[random];
    untypedfield.textContent = untyped;

    // テキストの意味を表示
    wordMeaning.textContent = wordMeanings[untyped];
};

// テキストの意味を格納
const wordMeanings = {
    'expire': '期限が切れる',
    'endorse': '承認する',
    'commute': '通勤する',
    'evacuate': '避難させる',
    'facilitate': '促進する',
    'update': '更新する',
    'verify': '正しいことを証明する',
    'disperse': '分散させる',
    'withhold': '与えずにおく',
    'arise': '(問題が)生じる',
    'enhance': '(価値を)高める',
    'certify': '証明する',
    'incur': '(負債を)負う',
    'deduct': '差し引く',
    'retrieve': '回収する',
    'amend': '修正する',
    'deteriorate': '悪化する',
    'collaborte': '共同で行う',
    'terminate': '終わらせる',
    'curb': '抑制する',
    'renovate': '改装する',
    'complement': '補完する',
    'discontinue': '(今までやってきたことを)中止する',
    'scrub': 'ごしごし磨く',
    'compile': '編集する',
    'reinforce': '補強する',
    'violate': '違反する',
    'alleviate': '緩和する',
    'emphasize': '強調する',
    'browse': 'ざっと目を通す',
    'remit': '送金する',
    'discard': '捨てる',
    'enforce': '(法律を)守らせる',
    'clarify': '明らかにする',
    'supervise': '監督する',
    'enlarge': '拡大する',
    'undertake': '着手する',
};

// キー入力の判定
const keyPress = e => {

    // 誤タイプの場合
    if(e.key !== untyped.substring(0,1)) {
        wrap.classList.add('mistyped');

        // 100ms後に背景色を元に戻す
        setTimeout(() => {
            wrap.classList.remove('mistyped');
        }, 100);

        return;
    }

    typed += untyped.substring(0,1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

// テキストがなくなったら新しいテキストを表示
if(untyped === '') {
    createText();
    }

    // 正タイプの場合
        // スコアのインクリメント
        score++;

        // 文字のカウント表示
        wordCount++;
        wordCountElement.textContent = wordCount;

};

// タイピングスキルのランクを判定
const rankCheck = score => {

    // テキストを格納する変数を作る
    let text = '';

    // スコアに応じて異なるメッセージを変数textに格納する
    if(score < 9) {
        text = `あなたのランクはCです。\nBランクまであと少し!`;
    }   else if(score < 15){
        text = `あなたのランクはBです。\nAランクまであと少し!`;
    }   else if(score < 20){
        text = `あなたのランクはAです\nあと少しでSランク!`;
    }   else if(score >= 20){
        text = `あなたのランクはSです\nおめでとうございます!`;
    }

    // 生成したメッセージと一緒に文字列を返す
    return `${score}文字打てました！${text}`;

};

// カウントダウンタイマー
const timer = () => {

    // タイマー部分のHTML要素（P要素）を取得する
    let time = count.textContent;

    const id  = setInterval(() => {

        // カウントダウンする
        time--;
        count.textContent = time;

        // カウントが0になったらタイマーを停止する
        if(time <= 0) {
            gameOver(id);
        }

    }, 1000);
};

// タイマーが停止したら「ゲームアップ！」と表示
const gameOver = id => {
    clearInterval(id);
    untypedfield.textContent = 'タイムアップ！';

    alert(rankCheck(score));

// OKボタンをクリックされたら最初の画面にリロードする
    setTimeout(() => {
        window.location.reload();
    },2000);
};

// ゲームスタート時の処理
start.addEventListener('click', () => {

    // カウントダウンタイマーを開始する
    timer();

    // ランダムなテキストを表示する
    createText();

// 「スタート」ボタンを非表示にする
start.style.display = 'none';

// キーボードのイベント処理
document.addEventListener('keypress', keyPress);

});

untypedfield.textContent = 'スタートボタンで開始';