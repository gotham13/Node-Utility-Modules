const Pool = require('multiprocessing').Pool;
let encryption_util = {
    encrypt_content: (row) => {
        let path = require('path');
        let crypto_util = require(path.join(row.dir_name,'crypto_util'));
        let h2p = require('html2plaintext');
        let head = row.header.replace(/font-size:/g, '').replace(/color:/g, '').replace(/text-align:justify/g, 'text-align:center');
        let sum = row.summary.replace(/font-size:/g, '').replace(/color:/g, '');
        let jud = row.judjement.replace(/font-size:/g, '').replace(/color:/g, '').replace(`<strong>Oral Judgment</strong>`, `<strong id="heading">||||||||||||||| Oral Judgment |||||||||||||||</strong>`).replace(`<strong>Judgment</strong>`, `<strong id="heading">||||||||||||||| Judgment |||||||||||||||</strong>`).replace(`<strong>Order</strong>`, `<strong id="heading">||||||||||||||| Order |||||||||||||||</strong>`);
        let text = row.summary;
        text = h2p(text);
        text = text.substr(0, 350);
        let enc_jud = crypto_util.encrypt(jud, 'chachamama');
        let enc_sum = crypto_util.encrypt(sum, 'chachamama');
        return [row.name, row.idd, row.publishing, row.year, row.volume, row.page, row.court, row.date, row.first_party, row.second_party, head, row.judges, row.relevancy, row.judge_sr, row.statues_name, row.statues_section, row.sorder, row.section, row.article, row.rule, row.other, row.dealt_with, row.case1, row.c2_nature, row.c2_number, row.c2_year, row.pdf, row.flag, row.user, row.citation, row.time, enc_jud, enc_sum, text,row.id];
    },
    start_encryption:async (rows)=>{
        const pool = new Pool(10);
        for(let row of rows)
            row.dir_name = __dirname;
        return await pool.map(rows, encryption_util.encrypt_content);
    }
};

module.exports = encryption_util;