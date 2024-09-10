// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate } from 'react-router-dom';

// import classes from './Milestones.module.css';
// import MilestoneCard from './MilestoneCard';
// import LevelDiamond from './LevelDiamond';
// import DraggableDiv from '../../DraggableDiv/DraggableDiv';
// import SkeletonMilestone from '../../UI/Skeletons/SkeletonMilestone';
// import DsButton from '../../UI/Buttons/DsButton';
// import { translate } from '../../../utils/translations';
// import { modalActions } from '../modalSlice';

// const Milestones = (props) => {
//     const location = useLocation();
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const levels = useSelector((state) => state.modal.levels);
//     const user = useSelector((state) => state.login.user);

//     const [currentMilestone, setCurrentMilestone] = useState(null);
//     const [thisLevelIndex, setThisLevelIndex] = useState(0);

//     useEffect(() => {
//         if (!levels) return;

//         for (let level of levels) {
//             for (let milestone of level.rewards.milestones) {
//                 if (user?.wagered < milestone.wagered) {
//                     setCurrentMilestone({
//                         level: level.level,
//                         milestone: milestone.milestone,
//                     });
//                     return;
//                 }
//             }
//         }
//     }, [levels?.length]);

//     useEffect(() => {
//         if (!levels) return;

//         const foundIndex = levels.findIndex((l) => l.level === props.activeLevel);
//         if (foundIndex > -1) setThisLevelIndex(foundIndex);
//     }, [levels?.length, props.activeLevel]);

//     const getProgress = () => {
//         if (!levels) return 0;

//         const userWagered = user?.wagered;

//         const levelMilestones = levels[thisLevelIndex].rewards.milestones;
//         const levelMin = levelMilestones[0];
//         const levelMinWagered = levelMin.wagered;
//         if (userWagered < levelMinWagered) return 0;

//         const nextLevelMilestones = thisLevelIndex < levels.length - 1 ? levels[thisLevelIndex + 1].rewards.milestones : levelMilestones;
//         const levelMax = nextLevelMilestones[0];
//         const levelMaxWagered = levelMax.wagered;

//         let progress = 100 * (userWagered / levelMaxWagered);

//         if (progress > 100) progress = 100;

//         return progress;
//     };

//     const getNeeded = (milestone) => {
//         return milestone.wagered - user?.wagered;
//     };

//     return (
//         <div className={classes.MilestoneSection}>
//             <div className={!user ? [classes.CarouselContainer, classes.NotLoggedIn].join(' ') : classes.CarouselContainer}>
//                 <div className={classes.MilestoneCarousel}>
//                     <DraggableDiv>
//                         <div className={classes.ScrollContent}>
//                             <div className={classes.ProgressBar}>
//                                 <div className={classes.BarContainer}>
//                                     <span style={{ width: `${getProgress()}%` }}></span>
//                                 </div>
//                                 <div className={classes.DiamondContainer}>
//                                     {levels ? (
//                                         <>
//                                             {levels[thisLevelIndex].rewards.milestones.map((milestone, index) => (
//                                                 <LevelDiamond
//                                                     key={`${levels[thisLevelIndex].level}_${milestone.milestone}`}
//                                                     complete={user?.wagered >= milestone.wagered}
//                                                     index={index}
//                                                 />
//                                             ))}

//                                             {thisLevelIndex < levels.length - 1 && (
//                                                 <LevelDiamond
//                                                     key={`${levels[thisLevelIndex].level}_${
//                                                         levels[thisLevelIndex].rewards.milestones[levels[thisLevelIndex].rewards.milestones.length]
//                                                     }`}
//                                                     complete={
//                                                         user?.wagered >=
//                                                         levels[thisLevelIndex + 1].rewards.milestones[levels[thisLevelIndex + 1].rewards.milestones.length - 1]
//                                                             .wagered
//                                                     }
//                                                     index=''
//                                                 />
//                                             )}
//                                         </>
//                                     ) : (
//                                         Array.from({ length: 6 }, (_, index) => <LevelDiamond key={index} complete={false} index={index} />)
//                                     )}
//                                 </div>
//                             </div>

//                             <div className={classes.CardsContainer}>
//                                 {levels ? (
//                                     <>
//                                         {levels[thisLevelIndex].rewards.milestones.map((milestone, index) => (
//                                             <MilestoneCard
//                                                 key={`${levels[thisLevelIndex].level}_${milestone.milestone}`}
//                                                 label={`Milestone ${milestone.milestone}`}
//                                                 index={index}
//                                                 complete={user?.wagered >= milestone.wagered}
//                                                 level={levels[thisLevelIndex]}
//                                                 needed={
//                                                     currentMilestone &&
//                                                     currentMilestone.level === levels[thisLevelIndex].level &&
//                                                     currentMilestone.milestone === milestone.milestone
//                                                         ? getNeeded(milestone)
//                                                         : null
//                                                 }
//                                             />
//                                         ))}

//                                         {thisLevelIndex < levels.length - 1 && (
//                                             <MilestoneCard
//                                                 key={`${levels[thisLevelIndex].level}_${
//                                                     levels[thisLevelIndex].rewards.milestones[levels[thisLevelIndex].rewards.milestones.length]
//                                                 }`}
//                                                 label='Locked'
//                                                 index={levels[thisLevelIndex].rewards.milestones.length}
//                                                 complete={
//                                                     user?.wagered >=
//                                                     levels[thisLevelIndex + 1].rewards.milestones[levels[thisLevelIndex + 1].rewards.milestones.length - 1]
//                                                         .wagered
//                                                 }
//                                                 level={levels[thisLevelIndex + 1]}
//                                                 nextLevel
//                                             />
//                                         )}
//                                     </>
//                                 ) : (
//                                     Array.from({ length: 6 }, (_, index) => (
//                                         <div key={index} className={classes.SkeletonWrapper}>
//                                             <div className={classes.Background}>
//                                                 <SkeletonMilestone />
//                                             </div>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         </div>
//                     </DraggableDiv>
//                 </div>
//             </div>
//             {!user && (
//                 <DsButton active={true} color='transparent' onClick={props.onGotoLogin}>
//                     {translate('Login to join VIP')}
//                 </DsButton>
//             )}
//         </div>
//     );
// };

// export default Milestones;
