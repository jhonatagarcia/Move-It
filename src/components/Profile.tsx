import styles from '../styles/components/Profile.module.css';

export function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/jhonatagarcia.png" alt="Jhonata Garcia"/>
            <div>
                <strong>Jhonata Garcia</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                Level 1
                </p>
            </div>
        </div>
    )
}