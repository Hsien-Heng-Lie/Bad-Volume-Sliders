CREATE DATABASE [BVS]

USE [BVS]
GO
/****** Object:  Table [dbo].[AudioDetail]    Script Date: 2023/05/10 16:46:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AudioDetail](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[Title] [varchar](255) NOT NULL,
	[Artist] [varchar](255) NOT NULL,
 CONSTRAINT [PK_AudioDetail] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AudioFIle]    Script Date: 2023/05/10 16:46:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AudioFIle](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[FileName] [varchar](255) NOT NULL,
	[Path] [varchar](255) NOT NULL,
 CONSTRAINT [PK_AudioFIle] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AudioLink]    Script Date: 2023/05/10 16:46:51 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AudioLink](
	[AudioDetailId] [bigint] NULL,
	[AudioFileId] [bigint] NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[AudioDetail] ON 
GO
INSERT [dbo].[AudioDetail] ([Id], [Title], [Artist]) VALUES (1, N'Green Tea', N'Purrple Cat; ')
GO
SET IDENTITY_INSERT [dbo].[AudioDetail] OFF
GO
SET IDENTITY_INSERT [dbo].[AudioFIle] ON 
GO
INSERT [dbo].[AudioFIle] ([Id], [FileName], [Path]) VALUES (1, N'purrple-cat-green-tea.mp3', N'\Music')
GO
SET IDENTITY_INSERT [dbo].[AudioFIle] OFF
GO
INSERT [dbo].[AudioLink] ([AudioDetailId], [AudioFileId]) VALUES (1, 1)
GO
ALTER TABLE [dbo].[AudioLink]  WITH CHECK ADD  CONSTRAINT [FK_AudioLink_AudioDetail] FOREIGN KEY([AudioDetailId])
REFERENCES [dbo].[AudioDetail] ([Id])
GO
ALTER TABLE [dbo].[AudioLink] CHECK CONSTRAINT [FK_AudioLink_AudioDetail]
GO
ALTER TABLE [dbo].[AudioLink]  WITH CHECK ADD  CONSTRAINT [FK_AudioLink_AudioFIle] FOREIGN KEY([AudioFileId])
REFERENCES [dbo].[AudioFIle] ([Id])
GO
ALTER TABLE [dbo].[AudioLink] CHECK CONSTRAINT [FK_AudioLink_AudioFIle]
GO
