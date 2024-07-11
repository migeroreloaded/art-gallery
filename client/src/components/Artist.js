import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    ArtistGrid,
    ArtistContainer,
    ArtistName,
    ArtistBio,
    ArtistImage,
    ArtistLoading,
    ErrorMessage
} from './styles';
