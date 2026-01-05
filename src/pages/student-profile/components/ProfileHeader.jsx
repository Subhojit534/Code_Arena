import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, isOwnProfile = true }) => {
    return (
        <div className="bg-card rounded-2xl border border-border shadow-soft p-6 lg:p-8 mb-6 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar */}
                <div className="relative group">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-4 border-background shadow-elevated flex items-center justify-center overflow-hidden">
                        {user?.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Icon name="User" size={48} className="text-primary/50" />
                        )}
                    </div>
                    {isOwnProfile && (
                        <button className="absolute bottom-0 right-0 p-2 rounded-full bg-card border border-border shadow-sm text-muted-foreground hover:text-primary transition-colors">
                            <Icon name="Camera" size={16} />
                        </button>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left space-y-2">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                                {user?.name || 'Student Name'}
                            </h1>
                            <p className="text-muted-foreground">@{user?.username || 'username'}</p>
                        </div>

                        {isOwnProfile && (
                            <Button
                                variant="outline"
                                size="sm"
                                iconName="Edit"
                                iconPosition="left"
                            >
                                Edit Profile
                            </Button>
                        )}
                    </div>

                    <p className="text-sm text-muted-foreground max-w-2xl">
                        {user?.bio || 'No bio provided yet. Add a short bio to tell others about yourself!'}
                    </p>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                        {user?.location && (
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Icon name="MapPin" size={14} />
                                <span>{user.location}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Icon name="Calendar" size={14} />
                            <span>Joined {new Date(user?.joinedAt || Date.now()).toLocaleDateString()}</span>
                        </div>
                        {user?.githubUrl && (
                            <a
                                href={user.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <Icon name="Github" size={14} />
                                <span>GitHub</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
