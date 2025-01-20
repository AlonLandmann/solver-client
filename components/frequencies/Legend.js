import { combos } from "@/lib/cards";

export default function Legend({ frequencies, setSelected }) {
    const brushes = {};

    for (let i = 0; i < 1326; i++) {
        if (!(String(frequencies[i]) in brushes)) {
            brushes[String(frequencies[i])] = [combos[i]];
        } else {
            brushes[String(frequencies[i])].push(combos[i]);
        }
    }

    function handleClick(e, frequency) {
        if (e.shiftKey) {
            setSelected(p => p.filter(c => !(brushes[frequency].includes(c))));
        } else {
            setSelected(p => p.concat(brushes[frequency]));
        }
    }

    return (
        <div className="p-8 flex flex-col gap-1">
            {Object.keys(brushes).toReversed().map(frequency => (
                <div
                    key={frequency}
                    className="px-3 py-2 border rounded-sm flex justify-between items-center gap-2 cursor-pointer"
                    onClick={e => handleClick(e, frequency)}
                >
                    <div
                        className="w-4 h-4 rounded-sm"
                        style={{
                            backgroundColor: `hsl(0, 0%, ${(20 + Number(frequency) * 0.07)}%)`,
                        }}
                    >

                    </div>
                    <div>
                        {frequency}
                    </div>
                </div>
            ))}
        </div>
    );
};

// import Category from '@/components/editor/Category'
// import { isValid } from '@/lib/cards'
// import { reverse, sortBy } from 'lodash'

// export default function Legend({ range, setHovered, setSelected }) {
//   let brushes = {}
//   let frequencyTotals = {}
//   let total = 0

//   range.matrix.forEach(({ combo, frequency, strategy }) => {
//     if (!isValid(combo, range.spot.board) || !frequency) {
//       return
//     }

//     const roundedStrategy = strategy.map(prob => Math.round(prob * 1000) / 1000)
//     const strategyKey = roundedStrategy.join(',')

//     if (!(strategyKey in brushes)) {
//       brushes[strategyKey] = [combo]
//       frequencyTotals[strategyKey] = 0
//     } else {
//       brushes[strategyKey].push(combo)
//     }

//     frequencyTotals[strategyKey] += frequency
//     total += frequency
//   })

//   return (!range.spot.options) ? null : (
//     <div className='border rounded py-3 px-4 text-neutral-300'>
//       <div className='pb-1 text-neutral-400'>
//         Legend
//       </div>
//       <div className='flex flex-col'>
//         {reverse(sortBy(Object.keys(brushes), [])).map(key => (
//           <div
//             key={key}
//             className={range.spot.street !== 'preflop' ? 'grid gap-1' : ''}
//             style={{ gridTemplateColumns: '1fr 30px' }}
//           >
//             <Category
//               range={range}
//               comboArray={brushes[key]}
//               name={'--use-strategy--'}
//               fraction={frequencyTotals[key] / total}
//               strategy={key.split(',').map(p => Number(p))}
//               setSelected={setSelected}
//               setHovered={setHovered}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


// import Button from '@/components/_ui/Button'
// import StrategyPreview from '@/components/editor/StrategyPreview'
// import { strategyColor } from '@/lib/colors'

// export default function Category({ range, comboArray, name, fraction, strategy, setSelected, setHovered }) {
//   function handleAddToSelected() {
//     setSelected(prev => prev.concat(comboArray))
//   }

//   function handleRemoveFromSelected() {
//     setSelected(prev => prev.filter(c => !comboArray.includes(c)))
//   }

//   function handleSetHovered() {
//     setHovered(comboArray)
//   }

//   function handleClearHovered() {
//     setHovered([])
//   }

//   return (
//     <div className='flex items-center gap-[3px]'>
//       <Button
//         theme='secondary'
//         utilClasses='h-[30px] w-[30px] p-0 flex justify-center items-center'
//         icon='dash-lg'
//         onClick={handleRemoveFromSelected}
//       />
//       <Button
//         theme='secondary'
//         utilClasses='h-[30px] w-[30px] p-0 flex justify-center items-center'
//         icon='plus-lg'
//         onClick={handleAddToSelected}
//       />
//       <div className='grow h-[34px] py-[2px] flex items-center gap-[2px]'
//         onMouseEnter={handleSetHovered}
//         onMouseLeave={handleClearHovered}>
//         <div className='min-w-16 sm:min-w-24 pl-[6px] pr-[3px] text-nowrap'>
//           {name != '--use-strategy--' ? name :
//             <div
//               className='w-[15px] h-[15px] rounded-sm'
//               style={{ background: strategyColor(range, strategy) }}
//             >

//             </div>
//           }
//         </div>
//         <div className='min-w-16 sm:min-w-20 ml-auto pl-[3px] pr-[6px] text-right'>
//           {(100 * fraction).toFixed(1)} %
//         </div>
//         <StrategyPreview
//           range={range}
//           strategy={strategy}
//         />
//       </div>
//     </div>
//   )
// }
