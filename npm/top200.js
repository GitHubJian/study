const fs = require('fs');
const cheerio = require('cheerio');
const superagent = require('superagent');

const task = offset =>
    new Promise((resolve, reject) => {
        superagent
            .get('https://www.npmjs.com/browse/depended')
            .query({ offset })
            .end((e, res) => {
                if (e) {
                    reject(e);
                } else {
                    const $ = cheerio.load(res.res.text);
                    const ret = $('.columnar li')
                        .map(function(i, v) {
                            const name = $(this)
                                .find('.name')
                                .text();
                            const description = $(this)
                                .find('.description')
                                .text();
                            const time = $(this)
                                .find('[data-date]')
                                .data('date')
                                .slice(0, 10);
                            return {
                                name,
                                description,
                                time
                            };
                        })
                        .get();
                    resolve(ret);
                }
            });
    });
Promise.all(Array.from(Array(5), (v, i) => i).map(v => task(36 * v))).then(
    rs => {
        let ret = rs
            .reduce((prev, cur) => {
                prev = prev.concat(cur);
                return prev;
            }, [])
            .slice(0, 200)
            .map((v, i) =>
                Object.assign(
                    {
                        rank: i + 1
                    },
                    v
                )
            );
        fs.writeFileSync(
            'data.json',
            JSON.stringify(
                {
                    errno: 0,
                    errMsg: '',
                    data: ret
                },
                null,
                2
            )
        );
    }
);
