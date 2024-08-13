module.exports = {
    name: "ping",
    type: "basicCommand",
    code: `
        $let[pingu;$ping]
        
        $title[0;$username[$clientID]'s latency]
        $description[0;\`$get[pingu]\` ms.]
        $color[0;FFEDF4]
        
        $addActionRow
        $if[$and[$get[pingu]>0;$get[pingu]<10]==true;
            $addButton[Faster!;bot_pingu;Success;;true]
        ]
        $if[$and[$get[pingu]>=10;$get[pingu]<50]==true;
            $addButton[Slowy;bot_pingu;Secondary;;true]
        ]
        $if[$get[pingu]>=50;
            $addButton[SLOW AF;bot_pingu;Danger;;true]
        ]
    `
}