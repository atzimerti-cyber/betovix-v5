// import { useSelector } from 'react-redux';
// import { SwiperSlide } from 'swiper/react';

// import classes from './Levels.module.css';
// import SimpleSwiper from '../../UI/MainSwiper/SimpleSwiper';
// import LoaderPlaceholder from '../../UI/Skeletons/LoaderPlaceholder';

// const Levels = (props) => {
//     const levels = useSelector((state) => state.modal.levels);

//     return (
//         <div className={classes.Levels}>
//             <SimpleSwiper>
//                 {levels
//                     ? levels.map((level) => {
//                           return (
//                               <SwiperSlide style={{ width: 'auto' }} key={level.level}>
//                                   <div
//                                       className={props.activeLevel === level.level ? [classes.CardContainer, classes.Active].join(' ') : classes.CardContainer}
//                                       onClick={() => props.onChangeLevel(level.level)}
//                                   >
//                                       <div className={classes.LevelCard}>
//                                           <div className={classes.LevelHeader}>
//                                               <div className={classes.IconContainer}>
//                                                   <div className={`CardLevel CardLevel${level.level}`}></div>
//                                               </div>
//                                               <p className={classes.LevelName}>{level.name}</p>
//                                           </div>
//                                       </div>
//                                   </div>
//                               </SwiperSlide>
//                           );
//                       })
//                     : Array.from({ length: 8 }, (_, index) => (
//                           <SwiperSlide style={{ width: '75px', height: '33.3px' }} key={index}>
//                               <LoaderPlaceholder extraStyles={{ backgroundColor: 'var(--db-gray-3)', borderRadius: '0.375rem' }} />
//                           </SwiperSlide>
//                       ))}
//             </SimpleSwiper>
//         </div>
//     );
// };

// export default Levels;
